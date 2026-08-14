import { JSX } from 'react';
import { ComponentProps } from 'lib/component-props';
import { demoImages } from 'lib/demo-images';

type Props = Partial<ComponentProps> & { fields?: Record<string, unknown> };

/**
 * Computer Science & AI undergraduate course detail page.
 */
export default function CourseCsAi(_props: Props): JSX.Element {
  return (
    <section className="component course-csai bg-white text-[var(--reading-ink)]">
      <div className="relative min-h-[48vh] overflow-hidden bg-[var(--reading-charcoal)] md:min-h-[58vh]">
        <img
          src={demoImages.courseCsAiHero}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="relative z-10 mx-auto flex min-h-[48vh] max-w-7xl flex-col justify-end px-4 py-10 md:min-h-[58vh] md:px-8 md:py-14">
          <p className="text-sm font-bold tracking-wide text-white/80 uppercase">Undergraduate</p>
          <h1 className="mt-2 max-w-3xl text-3xl font-bold text-white md:text-5xl">
            Computer Science and Artificial Intelligence
          </h1>
          <p className="mt-4 text-white/90">BSc · UCAS code G400 · 3 years full-time</p>
        </div>
      </div>

      <div className="border-b border-[#ddd9db] bg-[var(--reading-surface)]">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-6 px-4 py-4 text-sm md:px-8">
          <div>
            <span className="font-bold">Entry year</span> 2026/27
          </div>
          <div>
            <span className="font-bold">Location</span> Whiteknights campus
          </div>
          <div>
            <span className="font-bold">Typical offer</span> AAB–ABB
          </div>
        </div>
      </div>

      <div className="bg-[var(--reading-red)] text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-4 py-5 md:flex-row md:items-center md:px-8">
          <p className="font-bold">This course is available through Clearing 2026</p>
          <a href="/clearing/how-to-apply" className="reading-btn reading-btn-secondary">
            Apply in Clearing
          </a>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-12 md:grid-cols-[1.4fr_0.6fr] md:px-8 md:py-16">
        <div>
          <h2 className="text-2xl font-bold md:text-3xl">Course overview</h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--reading-charcoal)]">
            Combine core computer science with specialist artificial intelligence modules. You will
            learn to design software, analyse data, and build intelligent systems — preparing for
            roles across technology, research, and industry.
          </p>
          <p className="mt-4 text-base leading-relaxed text-[var(--reading-charcoal)]">
            Teaching draws on research excellence at Reading, with opportunities for projects,
            placements, and collaboration across the School of Mathematical, Physical and
            Computational Sciences.
          </p>

          <h3 className="mt-10 text-xl font-bold">What you will study</h3>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--reading-charcoal)]">
            <li>Programming, algorithms, and software engineering</li>
            <li>Machine learning and neural networks</li>
            <li>Data science and intelligent systems</li>
            <li>Ethics, security, and professional practice</li>
          </ul>
        </div>

        <aside className="h-fit border border-[#ddd9db] bg-[var(--reading-surface)] p-6">
          <h3 className="text-lg font-bold">Key facts</h3>
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="font-bold">Qualification</dt>
              <dd>BSc Computer Science and Artificial Intelligence</dd>
            </div>
            <div>
              <dt className="font-bold">Duration</dt>
              <dd>3 years full-time</dd>
            </div>
            <div>
              <dt className="font-bold">Department</dt>
              <dd>Computer Science</dd>
            </div>
          </dl>
          <a href="/clearing" className="reading-btn reading-btn-primary mt-6 w-full">
            Clearing options
          </a>
        </aside>
      </div>
    </section>
  );
}
