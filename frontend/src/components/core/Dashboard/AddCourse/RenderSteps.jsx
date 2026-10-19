import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiCheck } from 'react-icons/fi';
import CourseInformationForm from './CourseInfo/CourseInformationForm';
import CourseBuilderForm from './courseBuilder/CourseBuilderForm';
import PublishCourse from './publishCourse/PublishCourse';
import { setEditCourse, setStep } from '../../../../slices/courseSlice';
import './studio.css';

const steps = [
  { title: 'Details', subtitle: 'Title, cover & outcomes' },
  { title: 'Curriculum', subtitle: 'Sections & lessons' },
  { title: 'Publish', subtitle: 'Review & go live' },
];

export default function RenderSteps() {
  const { step } = useSelector(state => state.course);
  const dispatch = useDispatch();

  // Completed steps are clickable (like Udemy's course-creation sidebar).
  const goTo = target => {
    if (target >= step) return;
    if (target === 1) dispatch(setEditCourse(true));
    dispatch(setStep(target));
  };

  return (
    <div className="cs-flow">
      <nav aria-label="Course creation progress">
        <ol className="cs-stepper">
          {steps.map((item, index) => {
            const n = index + 1;
            const state = step === n ? 'is-current' : step > n ? 'is-complete' : '';
            return (
              <Fragment key={item.title}>
                {index > 0 && <li aria-hidden className={`cs-step-line ${step > index ? 'is-done' : ''}`} />}
                <li className="contents">
                  <button
                    type="button"
                    className={`cs-step ${state}`}
                    disabled={n >= step}
                    onClick={() => goTo(n)}
                    aria-current={step === n ? 'step' : undefined}
                  >
                    <span className="cs-step-num">{step > n ? <FiCheck /> : n}</span>
                    <span><b>{item.title}</b><small>{item.subtitle}</small></span>
                  </button>
                </li>
              </Fragment>
            );
          })}
        </ol>
      </nav>
      {step === 1 && <CourseInformationForm />}
      {step === 2 && <CourseBuilderForm />}
      {step === 3 && <PublishCourse />}
    </div>
  );
}
