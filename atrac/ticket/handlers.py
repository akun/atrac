#!/usr/bin/env python
# coding=utf-8


import time

import pymongo

import tornado

from atrac.share import JsonHandler
from atrac.db import connection


class TicketAddHandler(JsonHandler):

    def get(self):
        json_out = tornado.escape.json_encode({
            'code': 0, 'msg': 'success', 'result': {
                'types': [u'缺陷', u'改进/建议', u'功能', u'支持'],
                'milestones': ['1.0.0', '1.0.1', '1.0.2', '1.1.0', '2.0.0'],
                'versions': ['1.0.0', '1.0.1', '1.0.2', '1.1.0'],
                'categorys': [u'任务单', u'源码管理'],
                'assigneds': [u'<<我>>', 'dev', 'test', 'ops'],
                'ccs': ['dev', 'test', 'ops'],
            }
        })
        self.write(json_out)

    def post(self):
        json_in = tornado.escape.json_decode(self.request.body)
        summary = json_in['summary']
        ticket = connection.Ticket()
        ticket.summary = summary
        ticket.save()
        json_out = tornado.escape.json_encode({
            'code': 0, 'msg': 'success', 'result': {'summary': summary}
        })
        self.write(json_out)


class TicketListHandler(JsonHandler):

    def get(self):
        ticket_list = list(connection.Ticket.find().sort(
            'created_at', pymongo.DESCENDING
        ))  # TOOD pagination
        for ticket in ticket_list:
            ticket['id'] = str(ticket._id)
            ticket.created_at = time.mktime(ticket.created_at.timetuple())
            del ticket['_id']
        json_out = tornado.escape.json_encode(ticket_list)
        self.write(json_out)
