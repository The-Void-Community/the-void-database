import mongoose from "mongoose";

import { IResponse, SelfError, SelfStatus } from "../../types/status.type";

const deleteModel = async (
  name: string,
): Promise<IResponse<mongoose.Mongoose, any>> => {
  try {
    const data = mongoose.deleteModel(name);

    return new SelfStatus(data, `Модель ${name} удалена.`);
  } catch (err) {
    console.log(err);

    return new SelfError(new Error(`${err}`));
  }
};

export default deleteModel;
