import mongoose from "mongoose";

import { Model } from "../../types/mongodb.types";
import { IResponse, SelfError, SelfStatus } from "../../types/status.type";

const getAllModels = async (): Promise<IResponse<Model[], any>> => {
  try {
    const data = mongoose.modelNames() as Model[];

    if (!data) {
      return new SelfError("Возможно, таблиц не существует.", { resource: [] })
    }

    return new SelfStatus(data, "Таблицы были найдены.");
  } catch (err) {
    console.error(err);

    return new SelfError(new Error(`${err}`));
  }
};

export default getAllModels;
