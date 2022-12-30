import os


def count_lines(path, extensions=None, exclude_dirs=None):
    """
    Counts the number of lines of code in a directory.
    :param path: The directory to search in.
    :param extensions: A list of file extensions to include.
    :param exclude_dirs: A list of directories to exclude.
    :return: The number of lines of code.
    """
    lines = 0
    for root, dirs, files in os.walk(path):
        # mutates the original list, preventing os.walk to walk excluded dirs
        dirs[:] = [d for d in dirs if d not in exclude_dirs]
        for file in files:
            if extensions and not file.endswith(tuple(extensions)):
                continue
            with open(os.path.join(root, file), "r", encoding="utf-8") as f:
                n = len(f.readlines())
                print(f'File {file} has {n} lines')
                lines += n
    return lines


def main():
    path = './src'
    extensions = ['.ts', '.tsx']
    exclude_dirs = ['.git', 'node_modules', 'dev', 'scripts']  # just in case we change the path to '.'
    lines = count_lines(path, extensions, exclude_dirs)
    print('Total: ' + str(lines) + ' lines of code')


if __name__ == "__main__":
    main()
