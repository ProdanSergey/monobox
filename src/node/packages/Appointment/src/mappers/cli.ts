import { CLICommand } from "../definitions/cli";

type CLIArgument = string | undefined;

export const mapCLIToArgumentSequence = (cliArgs: string[]): [CLIArgument, CLIArgument] => {
  const [commandNameCLIArg, commandQueryCLIArg] = cliArgs.slice(2);

  return [commandNameCLIArg, commandQueryCLIArg];
};

export const mapArgumentToCLICommand = (cliArg: CLIArgument): CLICommand => {
  if (!cliArg?.startsWith("--")) {
    throw "CLICommandArgument must start with --";
  }

  const commandName = cliArg.slice(2) as CLICommand;

  if (!Object.values(CLICommand).includes(commandName)) {
    throw `Must use one of: ${Object.values(CLICommand).toString()}`;
  }

  return commandName;
};

type CLIQueryParams = Record<string, string>;

export const mapArgumentToCLIQuery = <T extends CLIQueryParams>(cliQuery?: string): T => {
  if (!cliQuery) {
    return {} as T;
  }

  return cliQuery
    .split("&")
    .map((entry) => entry.split("="))
    .reduce((params, [paramName, paramValue]) => {
      return {
        ...params,
        [paramName]: paramValue,
      };
    }, {} as T);
};
