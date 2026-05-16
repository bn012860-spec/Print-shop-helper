import { Job } from "../types/job";

type JobCardProps = {
  job: Job;
  onDone: (id: string) => Promise<void>;
};

export default function JobCard({ job, onDone }: JobCardProps) {
  return (
    <div>
      <p>{job.fileUrl}</p>
      <p>
        {job.printType} | {job.colorMode}
      </p>
      <p>Copies: {job.copies}</p>
      <button onClick={() => onDone(job._id)}>Mark Done</button>
    </div>
  );
}
