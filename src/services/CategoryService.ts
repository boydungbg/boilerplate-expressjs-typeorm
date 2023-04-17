import { Category } from '@/models/index';

const enum StatusCategory {
  ACTIVE = 1,
  IN_ACTIVE = 0
}

export type AddCategoryParams = {
  slug: string;
  name: string;
  description?: string;
};

export type UpdateCategoryParams = {
  id: string;
  slug: string;
  name: string;
  description?: string;
};

const addCategory = async ({ slug, name, description }: AddCategoryParams) => {
  const newCategory = await Category.create({
    slug: slug,
    name: name,
    description: description
  });
  return newCategory;
};

const getCategoryById = async (id: string) => {
  const category = await Category.findByPk(id);
  if (!category) return null;
  return category;
};

const getCategoryBySlug = async (slug: string) => {
  const category = await Category.findOne({
    where: { slug: slug }
  });
  if (!category) return null;
  return category;
};

const getAllCategory = async (page: number, limit: number) => {
  if (isNaN(page) || isNaN(limit)) {
    const data = await Category.findAll();
    return {
      categories: data
    };
  }
  const offset = (page - 1) * limit;
  const data = await Category.findAndCountAll({
    offset: offset,
    limit: limit
  });
  return {
    categories: data.rows,
    count: data.count,
    maxPage: Math.ceil(data.count / limit)
  };
};

const updateCategory = async ({
  id,
  slug,
  name,
  description
}: UpdateCategoryParams) => {
  const category = await Category.findOne({
    where: { id: id }
  });
  if (category) {
    category.slug = slug;
    category.name = name;
    category.description = description;
    category.save();
  } else {
    return null;
  }
  return category;
};

const updateStatusCategory = async (id: string) => {
  const category = await Category.findOne({
    where: { id: id }
  });
  if (!category) {
    return null;
  }
  category.status =
    category.status == StatusCategory.ACTIVE
      ? StatusCategory.IN_ACTIVE
      : StatusCategory.ACTIVE;
  category.save();
  return category;
};

export {
  addCategory,
  getCategoryById,
  getCategoryBySlug,
  getAllCategory,
  updateCategory,
  updateStatusCategory
};
