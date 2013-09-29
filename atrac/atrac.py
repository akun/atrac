#!/usr/bin/env python


import os

from tornado.options import define, options, parse_command_line
import tornado.ioloop
import tornado.web


define('port', default=8888, help='run on the given port', type=int)
define('debug', default=False, help='run on the debug mode', type=bool)


class AddTicketHandler(tornado.web.RequestHandler):

    def set_default_headers(self):
        self.set_header('Content-Type', 'application/json')

    def post(self):
        json_in = tornado.escape.json_decode(self.request.body)
        summary = json_in['summary']
        json_out = tornado.escape.json_encode({
            'code': 0, 'msg': 'success', 'result': {'summary': summary}
        })
        self.write(json_out)


def main():
    parse_command_line()
    application = tornado.web.Application(
        [
            (r'/a/ticket/add', AddTicketHandler),
        ],
        static_path=os.path.join(os.path.dirname(__file__), 'static'),
        debug=options.debug,
    )
    application.listen(options.port)
    tornado.ioloop.IOLoop.instance().start()


if __name__ == '__main__':
    main()
