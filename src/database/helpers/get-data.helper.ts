import type { Model as ModelType } from "mongoose";

import { FindOptions } from "../../types/mongodb.types";
import { IResponse, SelfError, SelfStatus } from "../../types/status.type";

const getData = async <T>(
  Model: ModelType<T>,
  options: FindOptions<T>,
): Promise<IResponse<T[], any>> => {
  try {
    const data = await Model.find(
      options.filter,
      options.projection,
      options.options,
    );

    if (!data || data.length === 0) {
      return new SelfError("Возможно, таблиц не существует.");
    }

    return new SelfStatus(data, "Таблицы были найдены.");
  } catch (err) {
    console.error(err);

    return new SelfError(new Error(`${err}`));
  }
};

export default getData;
