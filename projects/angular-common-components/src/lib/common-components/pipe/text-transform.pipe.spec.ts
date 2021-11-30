import { TransformTextPipe } from './text-transform.pipe';

describe('TextTransformPipe', () => {
  it('create an instance', () => {
    const pipe = new TransformTextPipe();
    expect(pipe).toBeTruthy();
  });
});
