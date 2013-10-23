#!/usr/bin/env python


import os

from svn import fs, repos, core


def get_file_from_svn_file(path, file_path, rev):
    path = core.svn_path_canonicalize(
        os.path.normpath(path).replace('\\', '/')
    )
    svn_repos = repos.svn_repos_open(path)
    fs_ptr = repos.svn_repos_fs(svn_repos)
    root = fs.revision_root(fs_ptr, rev)
    node_type = fs.check_path(root, file_path)

    content = None
    if node_type == core.svn_node_file:
        stream = core.Stream(fs.file_contents(root, file_path))
        content = stream.read()
    elif node_type == core.svn_node_dir:
        pass  # 'folder'
    else:
        pass  # 'error'

    return content


if __name__ == '__main__':
    get_file_from_svn_file('/path/to/svn/server/folder/', 'file', 3)
