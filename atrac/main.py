#!/usr/bin/env python


import os

from tornado.options import define, options, parse_command_line
import tornado.ioloop
import tornado.web

from atrac.ticket import handlers as ticket_handlers
from atrac.versioncontrol import handlers as vs_handlers


define('port', default=8888, help='run on the given port', type=int)
define('debug', default=False, help='run on the debug mode', type=bool)


def main():
    parse_command_line()
    application = tornado.web.Application(
        [
            (r'/a/ticket/add', ticket_handlers.TicketAddHandler),
            (r'/a/ticket/edit/(?P<ticket_id>[0-9a-f]{24})', ticket_handlers.TicketEditHandler),
            (r'/a/ticket/list/(?P<page>\d+)/(?P<limit>\d+)', ticket_handlers.TicketListHandler),
            (r'/a/source/file/(?P<path>.*)', vs_handlers.SourceFileHandler),
        ],
        static_path=os.path.join(os.path.dirname(__file__), 'static'),
        debug=options.debug,
    )
    application.listen(options.port)
    tornado.ioloop.IOLoop.instance().start()


if __name__ == '__main__':
    main()
