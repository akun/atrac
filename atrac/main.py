#!/usr/bin/env python


import os

from tornado.options import define, options, parse_command_line
import tornado.ioloop
import tornado.web

from atrac.ticket import handlers as ticket_handlers
from atrac.type import handlers as type_handlers
from atrac.versioncontrol import handlers as vs_handlers


define('port', default=8888, help='run on the given port', type=int)
define('debug', default=False, help='run on the debug mode', type=bool)
define('repos', default='/path/to/svn', help='subversion URL', type=str)


def get_application():
    application = tornado.web.Application(
        [
            (r'/a/ticket/create', ticket_handlers.TicketCreateHandler),
            (r'/a/ticket/read/(?P<page>\d+)/(?P<limit>\d+)', ticket_handlers.TicketReadHandler),
            (r'/a/ticket/read/(?P<page>\d+)/(?P<limit>\d+)/(?P<keyword>\w+)', ticket_handlers.TicketReadHandler),
            (r'/a/ticket/update/(?P<ticket_id>[0-9a-f]{24})', ticket_handlers.TicketUpdateHandler),
            (r'/a/ticket/delete', ticket_handlers.TicketDeleteHandler),
            (r'/a/ticket/attachment/(?P<ticket_id>[0-9a-f]{24})', ticket_handlers.TicketFileUploadHandler),

            (r'/a/source/read', vs_handlers.SourceReadHandler),
            (r'/a/source/read/(?P<path>.*)', vs_handlers.SourceReadHandler),

            (r'/a/type/create', type_handlers.TypeCreateHandler),
            (r'/a/type/read', type_handlers.TypeReadHandler),
            (r'/a/type/update/(?P<type_id>[0-9a-f]{24})', type_handlers.TypeUpdateHandler),
            (r'/a/type/delete', type_handlers.TypeDeleteHandler),
        ],
        static_path=os.path.join(os.path.dirname(__file__), 'static'),
        debug=options.debug,
    )
    return application


def main():
    parse_command_line()
    application = get_application()
    application.listen(options.port)
    tornado.ioloop.IOLoop.instance().start()


if __name__ == '__main__':
    main()
