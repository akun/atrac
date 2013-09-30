#!/usr/bin/env python


import datetime

from mongokit import Connection, Document


connection = Connection('mongodb://127.0.0.1')


@connection.register
class Ticket(Document):

    __database__ = 'atrac'
    __collection__ = 'ticket'

    use_dot_notation = True
    use_schemaless = True

    structure = {
        'summary': unicode,
        'description': unicode,
        'created_at': datetime.datetime,
    }

    required_fields = ['summary', 'created_at']

    default_values = {'created_at': datetime.datetime.now}
