#!/usr/bin/env python


import os

from svn import fs, repos, core


FILE = 'file'
FOLDER = 'folder'
KIND_MAP = {
    core.svn_node_file: FILE,
    core.svn_node_dir: FOLDER,
    0: 'empty',
}


def get_code(path, file_path, rev):
    node = SubversionNode(path, file_path, rev)
    if node.kind == FILE:
        return FILE, node.get_file()
    elif node.kind == FOLDER:
        return FOLDER, node.get_nodes()
    else:
        pass  # 'error'


class SubversionNode(object):

    def __init__(self, path, file_path, rev):
        self.file_path = file_path
        self.rev = rev
        self.path = path

        repos_path = core.svn_path_canonicalize(
            os.path.normpath(self.path).replace('\\', '/')
        )
        svn_repos = repos.svn_repos_open(repos_path)
        fs_ptr = repos.svn_repos_fs(svn_repos)
        self.root = fs.revision_root(fs_ptr, self.rev)
        self.kind = KIND_MAP[fs.check_path(self.root, self.file_path)]
        self.name = os.path.split(self.file_path)[-1]

    def get_file(self):
        stream = core.Stream(fs.file_contents(self.root, self.file_path))
        content = stream.read()
        return content

    def get_nodes(self):
        entries = fs.dir_entries(self.root, self.file_path)
        for file_path in entries.keys():
            full_file_path = os.path.join(self.file_path, file_path)
            yield SubversionNode(self.path, full_file_path, self.rev)
