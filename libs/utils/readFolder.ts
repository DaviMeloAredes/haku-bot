import fg from 'fast-glob';

export type FilesProps = { pathFileDir: string; fileProps: any };
type ReadFolderParams = {
	path: string;
	extension?: string;
	returnProps?: boolean;
};

export default async ({ path, extension, returnProps }: ReadFolderParams) => {
	let suffix = `/**/**`;

	if (extension) {
		suffix += extension;
	}

	const files = async () => {
		let paths: string[] = [];

		await fg(`${path}${suffix}`)
			.then((directories) => (paths = directories))
			.catch(console.log);

		return paths;
	};

	if (returnProps) {
		const filesPaths = await files();

		const getFilesProps = async () => {
			let filesProps: FilesProps[] = [];

			filesPaths.forEach(async (file) => {
				const props = await import(`../../${file}`);

				filesProps.push({
					pathFileDir: file,
					fileProps: props,
				});
			});

			return filesProps;
		};

		return getFilesProps();
	}

	return files();
};
