import { SubmitProblemDto as ISubmitProblemDto } from '@banbok/shared';

export class SubmitProblemDto implements ISubmitProblemDto {
  readonly link: string;
}
