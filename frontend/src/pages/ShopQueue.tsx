import { useEffect, useState } from "react";
import { getJobs, markJobDone } from "../api/job";
import JobCard from "../components/JobCard";
import { Job } from "../types/job";

export default function ShopQueue() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const loadJobs = async () => {
    setIsLoading(true);
    setMessage("");

    try {
      const data = await getJobs("shop1");
      console.log("Jobs fetched:", data);
      setJobs(data);
    } catch (error) {
      const err = error as Error;
      setMessage(err.message || "Failed to load jobs");
    } finally {
      setIsLoading(false);
    }
  };

  const markDone = async (id: string) => {
    try {
      await markJobDone(id);
      await loadJobs();
    } catch (error) {
      const err = error as Error;
      setMessage(err.message || "Failed to update job");
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  return (
    <div>
      <h1>Shop Queue</h1>
      <button onClick={loadJobs} disabled={isLoading}>
        {isLoading ? "Loading..." : "Reload"}
      </button>
      <p>{message}</p>
      {jobs.map((job) => (
        <JobCard key={job._id} job={job} onDone={markDone} />
      ))}
    </div>
  );
}
