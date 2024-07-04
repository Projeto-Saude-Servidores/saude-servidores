import TimelineRoundedIcon from "@mui/icons-material/TimelineRounded";
export default function ButtonNav({ title, children }) {
  return (
    <button className=" flex items-center">
      <div className=" mr-2">{title}</div>
      <div>{children}</div>
    </button>
  );
}
