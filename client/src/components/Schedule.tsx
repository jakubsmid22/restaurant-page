import ScheduleType from "../types/Schedule";

const Schedule = ({ schedule }: { schedule: ScheduleType | null }) => {
  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="uppercase text-xl my-5 font-bold">
        {schedule?.name}
      </h2>
      <div className="w-full space-y-2">
        <div className="flex justify-between">
          <p>Monday</p>
          {schedule?.monday}
        </div>
        <div className="flex justify-between">
          <p>Tuesday</p>
          {schedule?.tuesday}
        </div>
        <div className="flex justify-between">
          <p>Wednesday</p>
          {schedule?.wednesday}
        </div>
        <div className="flex justify-between">
          <p>Thursday</p>
          {schedule?.thursday}
        </div>
        <div className="flex justify-between">
          <p>Friday</p>
          {schedule?.friday}
        </div>
        <div className="flex justify-between">
          <p>Saturday</p>
          {schedule?.saturday}
        </div>
        <div className="flex justify-between">
          <p>Sunday </p>
          {schedule?.sunday}
        </div>
      </div>
    </div>
  );
};

export default Schedule;
