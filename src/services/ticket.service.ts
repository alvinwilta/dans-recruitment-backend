import { Ticket, Time } from "../interfaces/ticket.interface";
import TicketModel from "../models/ticket.model";
import logger from "../utils/logger";
import dayjs from "dayjs";
import nodemailer from "nodemailer";
import config from "../config/config";

//* Create one ticket
export async function createOneTicketService(token: string, name: string) {
  try {
    const time = <Time>{
      start: dayjs().format(),
      end: "",
    };
    const tiket = <Ticket>{
      token: token,
      name: name,
      period: time,
    };
    return await TicketModel.create(tiket);
  } catch (error: any) {
    logger.error(error);
    throw Error(error);
  }
}

export async function findOneTicketService(query: any) {
  try {
    return await TicketModel.findOne(query);
  } catch (err: any) {
    logger.error(err);
    throw err;
  }
}

export async function deleteOneTicketService(query: any) {
  try {
    const res = await TicketModel.deleteOne(query);
    return {
      acknowledged: res.acknowledged,
      deletedCount: res.deletedCount || 0,
    };
  } catch (err: any) {
    logger.error(err);
    throw err;
  }
}

export async function findAllTicketService() {
  try {
    return await TicketModel.find();
  } catch (err: any) {
    logger.error(err);
    throw err;
  }
}
