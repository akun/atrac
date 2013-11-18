#!/usr/bin/env python
# coding=utf-8


import os
import time

from bson.objectid import ObjectId

import pymongo

import tornado

from atrac.share import JsonHandler
from atrac.db import connection


class TicketCreateHandler(JsonHandler):

    def get(self):
        json_out = tornado.escape.json_encode({
            'code': 0, 'msg': 'success', 'result': get_ticket_item_info()
        })
        self.write(json_out)

    def post(self):
        json_in = tornado.escape.json_decode(self.request.body)
        ticket = connection.Ticket()
        for k, v in json_in.items():
            ticket[k] = v
        ticket.save()
        json_out = tornado.escape.json_encode({
            'code': 0, 'msg': 'success', 'result': {
                'ticket': {'id': str(ticket['_id'])}
            }
        })
        self.write(json_out)


class TicketReadHandler(JsonHandler):

    def get(self, page, limit, keyword=None):
        page, limit = int(page), int(limit)
        count = connection.Ticket.find().count()
        bottom = (page - 1) * limit
        top = bottom + limit
        if top >= count:
            top = count

        query = {}
        if keyword:
            query['$or'] = []
            for field_name in ('summary', 'description'):
                query['$or'].append({
                    field_name: {'$regex': regexp(keyword), '$options': 'i'}
                })

        tickets = list(connection.Ticket.find(query).sort(
            'created_at', pymongo.DESCENDING
        )[bottom:top])
        for ticket in tickets:
            serialize_json(ticket)
        json_out = tornado.escape.json_encode({
            'tickets': tickets, 'count': count,
        })
        self.write(json_out)


class TicketUpdateHandler(JsonHandler):

    def get(self, ticket_id):
        ticket = connection.Ticket.find_one({'_id': ObjectId(ticket_id)})
        serialize_json(ticket)
        result = get_ticket_item_info()
        result['ticket'] = ticket
        json_out = tornado.escape.json_encode({
            'code': 0, 'msg': 'success', 'result': result
        })
        self.write(json_out)

    def post(self, ticket_id):
        json_in = tornado.escape.json_decode(self.request.body)
        ticket = connection.Ticket.find_one({'_id': ObjectId(ticket_id)})
        for k, v in json_in.items():
            if k in ('id', 'created_at'):
                continue
            ticket[k] = v
        ticket.save()
        json_out = tornado.escape.json_encode({
            'code': 0, 'msg': 'success', 'result': {}
        })
        self.write(json_out)


class TicketDeleteHandler(JsonHandler):

    def post(self):
        ticket_ids = [ObjectId(i) for i in self.request.body.split(',')]
        connection.Ticket.collection.remove({'_id': {'$in': ticket_ids}})
        json_out = tornado.escape.json_encode({
            'code': 0, 'msg': 'success', 'result': {}
        })
        self.write(json_out)


class TicketFileUploadHandler(JsonHandler):

    def post(self, ticket_id):
        base_dir = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))
        upload_dir = os.path.join(base_dir, 'upload')
        if not os.path.isdir(upload_dir):
            os.mkdir(upload_dir)

        ticket = connection.Ticket.find_one({'_id': ObjectId(ticket_id)})
        for attachment in self.request.files['file']:
            attachment_path = os.path.join(upload_dir, attachment['filename'])
            with open(attachment_path, 'w') as attachment_file:
                attachment_file.write(attachment['body'])
            ticket.attachments.append(attachment['filename'])
        ticket.save()

        json_out = tornado.escape.json_encode({
            'code': 0, 'msg': 'success', 'result': {}
        })
        self.write(json_out)


def serialize_json(ticket):
    ticket['id'] = str(ticket._id)
    ticket.created_at = time.mktime(ticket.created_at.timetuple())
    del ticket['_id']


def get_ticket_item_info():
    return {
        'types': list(connection.Type.find(fields={
            'name': 1, 'default': 1, '_id': 0,
        })),
        'milestones': list(connection.Milestone.find(fields={
            'name': 1, 'default': 1, '_id': 0,
        })),
        'versions': list(connection.Version.find(fields={
            'name': 1, 'default': 1, '_id': 0,
        })),
        'categorys': list(connection.Category.find(fields={
            'name': 1, 'default': 1, '_id': 0,
        })),
        'assigneds': [u'<<我>>', 'dev', 'test', 'ops'],
        'ccs': ['dev', 'test', 'ops'],
    }


def regexp(q):
    return q.replace('\\', '\\\\')\
            .replace('.', '\.')\
            .replace('*', '\*')\
            .replace('+', '\+')\
            .replace('?', '\?')\
            .replace('[', '\[')\
            .replace(']', '\]')\
            .replace('(', '\(')\
            .replace(')', '\)')\
            .replace('^', '\^')\
            .replace('$', '\$')\
            .replace('|', '\|')
