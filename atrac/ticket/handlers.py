#!/usr/bin/env python


import time

import pymongo

import tornado

from atrac.share import JsonHandler
from atrac.db import connection


class AddTicketHandler(JsonHandler):

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


class ListTicketHandler(JsonHandler):

    def get(self):
        ticket_list = list(connection.Ticket.find().sort(
            'created_at', pymongo.DESCENDING
        )[:10])  # TOOD pagination
        for ticket in ticket_list:
            ticket['id'] = str(ticket._id)
            ticket.created_at = time.mktime(ticket.created_at.timetuple())
            del ticket['_id']
        json_out = tornado.escape.json_encode(ticket_list)
        self.write(json_out)
