import Link from 'next/link';
import { JOBS, jobHref, type Job } from '@/lib/aspire-catalog';
import { imageSrc } from '@/lib/aspire-dam';

export function JobCard({ job }: { job: Job }) {
  const photo = imageSrc(undefined, job.image);
  return (
    <article className="aspire-job">
      {photo ? <img className="aspire-photo" src={photo} alt="" /> : null}
      <p className="aspire-job__sector">{job.sector}</p>
      <h3>
        <Link href={jobHref(job)}>{job.title}</Link>
      </h3>
      <ul>
        <li>Type {job.type}</li>
        <li>Salary {job.salary}</li>
        <li>Location {job.location}</li>
      </ul>
      <p>{job.summary}</p>
    </article>
  );
}

export function JobGrid({ jobs = JOBS }: { jobs?: Job[] }) {
  return (
    <div className="aspire-jobs">
      {jobs.map((job) => (
        <JobCard key={job.slug} job={job} />
      ))}
    </div>
  );
}
