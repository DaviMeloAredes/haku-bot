const fg = require('fast-glob');

module.exports = async ({ path, extension, returnProps }) => {
    let suffix = `/**/**`;
    let filesProps = [];

    if (extension) {
        suffix += extension;
    }

    const files = await fg(`${path}${suffix}`)
        .catch((e) => {
            console.log(e);
        });

    if (returnProps) {
        files.forEach(async (file) => {
            const props = require(`../../${file}`)

            filesProps.push({
                pathFileDir: file,
                fileProps: props
            })
        })

        return filesProps;
    }

    return files;
}