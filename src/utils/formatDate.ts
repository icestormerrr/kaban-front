import moment from "moment/moment";

export default function formatDate(date: Date | number): string {
  return moment(date).format("HH:mm DD.MM");
}
