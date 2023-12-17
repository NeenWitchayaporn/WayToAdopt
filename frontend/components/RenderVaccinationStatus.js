/* RenderVaccinationStatus function renders the vaccination status based on provided input
 * vaccinationStatus : vaccination status ('Y', 'N', 'NS')
 * return
 * - text rendered from vaccination status
 */
const RenderVaccinationStatus = (vaccinationStatus) => {
  switch (vaccinationStatus) {
    case "Y":
      return "ได้รับวัคซีนเรียบร้อยแล้ว"; // return for 'Y' status (Yes)
    case "N":
      return "ยังไม่ได้รับวัคซีน"; // return for 'N' status (No)
    case "NS":
      return "-"; // return for 'NS' status (Not Sure)
    default:
      return "ไม่ระบุ"; // return for other unspecified status
  }
};

export default RenderVaccinationStatus;
