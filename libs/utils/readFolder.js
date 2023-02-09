const fg = require('fast-glob');

module.exports = async ({ path, extension, returnProps }) => {
    let suffix = `/**/**`;
    let filesProps = [];

    // if the extension is specified, add it to the suffix
    if (extension) {
        suffix += extension;
    }

    const files = await fg(`${path}${suffix}`)
        .catch(console.log)

    // if true, it will return not only the directories, 
    // but also the properties that the files export
    if (returnProps) {
        files.forEach(async (file) => {
            const props = require(`../../${file}`)

            // pushing the file directory and the file properties
            filesProps.push({
                pathFileDir: file,
                fileProps: props
            })
        })

        return filesProps;
    }

    // if returnProps is false, just returns the directories
    return files;
}