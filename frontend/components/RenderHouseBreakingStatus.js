/* RenderHousebreakingStatus function renders the housebreaking status based on input
 * housebreakingStatus : housebreaking status ('Y', 'N', 'NS')
 * return
 * - text rendered from housebreaking status
 */
const RenderHousebreakingStatus = (housebreakingStatus) => {
  switch (housebreakingStatus) {
    case "Y":
      return "ฝึกฝนการขับถ่ายแล้ว"; // return for 'Y' status (Yes)
    case "N":
      return "ยังไม่ฝึกฝนการขับถ่าย"; // return for 'N' status (No)
    case "NS":
      return "-"; // return for 'NS' status (Not Sure)
    default:
      return "ไม่ระบุ"; // return for other unspecified status
  }
};

export default RenderHousebreakingStatus;
