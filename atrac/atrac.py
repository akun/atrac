#!/usr/bin/env python


import os
import time

from tornado.options import define, options, parse_command_line
import tornado.ioloop
import tornado.web

from db import connection


define('port', default=8888, help='run on the given port', type=int)
define('debug', default=False, help='run on the debug mode', type=bool)

class JsonHandler(tornado.web.RequestHandler):

    def set_default_headers(self):
        self.set_header('Content-Type', 'application/json')


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
        ticket_list = list(connection.Ticket.find()[:10])  # TOOD pagination
        for ticket in ticket_list:
            ticket['id'] = str(ticket._id)
            ticket.created_at = time.mktime(ticket.created_at.timetuple())
            del ticket['_id']
        json_out = tornado.escape.json_encode(ticket_list)
        self.write(json_out)


def main():
    parse_command_line()
    application = tornado.web.Application(
        [
            (r'/a/ticket/add', AddTicketHandler),
            (r'/a/ticket/list', ListTicketHandler),
        ],
        static_path=os.path.join(os.path.dirname(__file__), 'static'),
        debug=options.debug,
    )
    application.listen(options.port)
    tornado.ioloop.IOLoop.instance().start()


if __name__ == '__main__':
    main()
