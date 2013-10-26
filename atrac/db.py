#!/usr/bin/env python


import datetime

from mongokit import Connection, Document as MongokitDocument


connection = Connection('mongodb://127.0.0.1')


class Document(MongokitDocument):

    __database__ = 'atrac'

    use_dot_notation = True
    use_schemaless = True


@connection.register
class Ticket(Document):

    __collection__ = 'atrac_ticket'

    structure = {
        'summary': unicode,
        'description': unicode,
        'type': unicode,
        'milestone': unicode,
        'version': unicode,
        'category': unicode,
        'assigned': unicode,
        'created_at': datetime.datetime,
    }

    required_fields = ['summary', 'created_at']

    default_values = {'created_at': datetime.datetime.now}


@connection.register
class Type(Document):

    __collection__ = 'atrac_type'

    structure = {
        'name': unicode,
        'default': bool,
    }

    required_fields = ['name', 'default']

    default_values = {'default': False}


@connection.register
class Milestone(Document):

    __collection__ = 'atrac_milestone'

    structure = {
        'name': unicode,
        'default': bool,
        'created_at': datetime.datetime,
    }

    required_fields = ['name', 'default', 'created_at']

    default_values = {
        'default': False,
        'created_at': datetime.datetime.now,
    }


@connection.register
class Version(Document):

    __collection__ = 'atrac_version'

    structure = {
        'name': unicode,
        'default': bool,
    }

    required_fields = ['name', 'default']

    default_values = {'default': False}


@connection.register
class Category(Document):

    __collection__ = 'atrac_category'

    structure = {
        'name': unicode,
        'default': bool,
    }

    required_fields = ['name', 'default']

    default_values = {'default': False}
