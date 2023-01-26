import Category from "@/models/Category";
import GenUUID from "@/utils/GenUUID";

type AddCategoryParams = {
  slug: string;
  name: string;
  description: string | undefined;
}

const enum StatusCategory {
  ACTIVE = 1,
  IN_ACTIVE = 0
}

type UpdateCategoryParams = {
  id: string
  slug: string;
  name: string;
  description: string | undefined;
  status: number | undefined;
}

const addCategory = async ({ slug, name, description }: AddCategoryParams) => {
  const newCategory = await Category.create({
    id: GenUUID(),
    slug: slug,
    name: name,
    description: description,
  });
  return newCategory
}

const getCategoryBySlug = async (slug: string) => {
  const category = await Category.findOne({
    where: { slug: slug },
  })

  return category;
}

const getAllCategory = async (page: number, limit: number) => {
  if (isNaN(page) || isNaN(limit)) {
    const data = await Category.findAll();
    return {
      categories: data
    }
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
  }
}

const updateCategory = async ({ id, slug, name, description, status }: UpdateCategoryParams) => {
  const category = await Category.findOne({
    where: { id: id },
  })
  if (category) {
    category.slug = slug;
    category.name = name;
    category.description = description;
    category.save();
  } else {
    return null;
  }
  return category;
}

const updateStatusCategory = async (id: string) => {
  const category = await Category.findOne({
    where: { id: id },
  })
  if (category) {
    category.status = category.status == StatusCategory.ACTIVE ? StatusCategory.IN_ACTIVE : StatusCategory.ACTIVE;
    category.save();
  } else {
    return null;
  }
  return category;
}


export { addCategory, getCategoryBySlug, getAllCategory, updateCategory, updateStatusCategory };