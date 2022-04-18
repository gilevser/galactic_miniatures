/* eslint-disable prefer-template */
const uuid = require('uuid');
const path = require('path');
const {
	Tag,
	File,
	Item,
	Photo,
	Category,
	SubCategory,
	ItemsAndTag,
} = require('../db/models');

module.exports.addItem = async (req, res, next) => {
	console.log('<<<<<<<addItem REQ BODY>>>>>>>', req.body);

	try {
		const { zip, photos } = req.files;
		console.log('"!!!req.files!!!"', req.files);
		console.log('"!!!!!!!photos!!!!!!!"', photos);
		console.log('"!!!!!!!zip!!!!!!!"', zip);
		// const photoName = uuid.v4() + '.jpg';
		// const zipName = uuid.v4() + '.zip';
		// photos.mv(path.resolve(__dirname, '..', 'static', photoName));
		// zip.mv(path.resolve(__dirname, '..', 'static', zipName));

		const photoNames = [];
		if (Array.isArray(photos)) {
			photos.forEach((photo) => {
				const photoName = uuid.v4() + '.jpg';
				photo.mv(path.resolve(__dirname, '..', 'static', photoName));
				photoNames.push(photoName);
			});
		} else {
			const photoName = uuid.v4() + '.jpg';
			photos.mv(path.resolve(__dirname, '..', 'static', photoName));
			photoNames.push(photoName);
		}

		const zipNames = [];
		if (Array.isArray(zip)) {
			zip.forEach((oneZip) => {
				const zipName = uuid.v4() + '.jpg';
				oneZip.mv(path.resolve(__dirname, '..', 'static', uuid.v4() + '.zip'));
				zipNames.push(zipName);
			});
		} else {
			const zipName = uuid.v4() + '.jpg';
			zip.mv(path.resolve(__dirname, '..', 'static', uuid.v4() + '.zip'));
			zipNames.push(zipName);
		}

		const category = await Category.findOne({
			where: { categoryTitle: req.body.category1 }, raw: true,
		});

		const subCategory = await SubCategory.findOne({
			where: { subCategoryTitle: req.body.category2 }, raw: true,
		});

		const newItem = await Item.create({
			userId: 4, 													// ХАРДКОД
			categoryId: category.id,
			subCategoryId: subCategory.id,
			collectionId: 3, 										// ХАРДКОД
			itemTitle: req.body.title,
			digitalPrice: req.body.scale,
			isApproved: false,
			description: req.body.description,
		});

		// ===================================================================

		const tagIdArr = [];

		const tagsArr = req.body.tags;

		tagsArr.forEach(async (tag) => {
			const existingTag = await Tag.findOne({ where: { tagName: tag }, raw: true });
			if (existingTag) {
				tagIdArr.push(existingTag.id);
			} else {
				const newTag = await Tag.create({ tagName: tag });
				tagIdArr.push(newTag.id);
			}
		});

		// УБРАТЬ ЭТОТ КОСТЫЛЬ ПЕРЕПИСАВ НА THEN'ы
		setTimeout(() => {
			tagIdArr.forEach(async (el) => {
				await ItemsAndTag.create({ itemId: newItem.id, tagId: el });
			});
		}, 2000);

		// ===================================================================

		photoNames.forEach(async (photoName) => {
			await Photo.create({ itemId: newItem.dataValues.id, photoUrl: photoName });
		});

		zipNames.forEach(async (zipName) => {
			await File.create({ itemId: newItem.dataValues.id, photoUrl: zipName });
		});

		// await Photo.create({ itemId: newItem.dataValues.id, photoUrl: photoName });
		// await File.create({ itemId: newItem.dataValues.id, fileUrl: zipName });

		return res.json(newItem);
	} catch (error) {
		console.error('{{{{{{addItem<<<<error>>>>}}}}}}', error);
		next(error);
	}
};
