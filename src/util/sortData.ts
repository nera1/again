export interface Problem {
  Name: {
    url: string;
    tag: string;
  };
  Level: string;
  Stack: string;
  Last: string;
  Next: string;
}

export interface ClassifiedProblems {
  today: Problem[];
  missed: Problem[];
  nextup: Problem[];
  done: Problem[];
}

/**
 * 주어진 2차원 배열(문제 목록의 배열) 데이터를 모두 합친 뒤,
 * 'Next' 날짜를 기준으로 4가지 부류로 분류해주는 유틸 함수입니다.
 *
 * @param dataSets 2차원 배열 형태의 ProblemItem들
 * @param todayDate 비교 기준이 될 오늘 날짜 (기본값: new Date()의 'YYYY-MM-DD' 문자열)
 * @returns 4가지 부류로 분류된 문제 객체 목록
 */
export function sortProblemData(
  dataSets: Problem[][],
  todayDate: string = new Date().toISOString().slice(0, 10) // 'YYYY-MM-DD'
): ClassifiedProblems {
  const allProblems = dataSets.flat();

  const today: Problem[] = [];
  const missed: Problem[] = [];
  const nextup: Problem[] = [];
  const done: Problem[] = [];

  allProblems.forEach((problem) => {
    if (!problem.Next) {
      done.push(problem);
    } else if (problem.Next === todayDate) {
      today.push(problem);
    } else if (problem.Next < todayDate) {
      missed.push(problem);
    } else {
      nextup.push(problem);
    }
  });

  return {
    today,
    missed,
    nextup,
    done,
  };
}
