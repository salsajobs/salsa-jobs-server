const jobsUtils = require('../../src/jobs/jobs.utils');
const Commands = require('../../src/constants/commands');

describe('.getLink', () => {
  it('should get the link from a text string', () => {
    const fakeText = 'Some text with a link https://example.com/foo.pdf';
    const expected = 'https://example.com/foo.pdf';

    const actual = jobsUtils.getLink(fakeText);

    expect(actual).toEqual(expected);
  });

  it('should throw an error when the text does not contain a link', () => {
    const fakeText = 'Some text without a link!';

    expect(function () {
      jobsUtils.getLink(fakeText);
    }).toThrow();

  });
});

describe('.getCommand', () => {
  it('should return the empty command if the text is empty', () => {
    const text = '';
    const actual = jobsUtils.getCommand(text);
    const expected = Commands.EMPTY;
    expect(actual).toEqual(expected);
  });

  it('should return the help command if the text starts with help', () => {
    const text = 'help';
    const actual = jobsUtils.getCommand(text);
    const expected = Commands.HELP;

    expect(actual).toEqual(expected);
  });

  it('should return the joblist command if the text starts with joblist', () => {
    const text = 'joblist';
    const actual = jobsUtils.getCommand(text);
    const expected = Commands.JOB_LIST;

    expect(actual).toEqual(expected);
  });

  it('should return createjob command if the text contains a link', () => {
    const text = 'https://example.com';
    const actual = jobsUtils.getCommand(text);
    const expected = Commands.CREATE_JOB;

    expect(actual).toEqual(expected);
  });

  it('should return the wrongcommand command if it is not any of the previous commands', () => {
    const text = 'whatever';
    const actual = jobsUtils.getCommand(text);
    const expected = Commands.WRONG_COMMAND;

    expect(actual).toEqual(expected);
  });
});
