import Strings from 'locale/Strings';

export const getSeatProps = (seat) => {
  const part = seat.split('_');
  const section = Strings[part[0]];
  const annotation = Strings[part[1]];
  const row = part[2];
  const seatno = part[3];
  return {section, annotation, row, seatno};
};
