import { InternalError, ValidationError } from "../domain/error";

export const mapToArguments = (args: string[]): string[] => {
  if (args.length < 2) {
    throw new InternalError();
  }

  const [commandArg, inputArg = ""] = args.slice(2);

  return [commandArg, inputArg];
};

export const mapToCommand = (arg: string): string => {
  if (!arg?.startsWith("--")) {
    throw new ValidationError('Must be type of string, must be prefixed with "--"', "--command");
  }

  return arg.slice(2);
};

export type ArgumentQuery = Record<string, string>;

export type ArgumentInput = {
  value: string;
  query: ArgumentQuery;
};

export const mapToInput = (arg: string) => {
  const [value, query] = arg.split("?");

  return {
    value,
    query: mapToQuery(query),
  };
};

export const mapToQuery = (query?: string): ArgumentQuery => {
  if (!query) {
    return {};
  }

  return query.split("&").reduce((acc, current) => {
    const [key, value] = current.split("=");

    return {
      ...acc,
      [key]: value,
    };
  }, {});
};

export type TextQuery = {
  text: string;
};

export const mapToTextQuery = (text: string): TextQuery => {
  if (!text) {
    throw new ValidationError('"text" query must be type of string, not empty', "?text=string");
  }

  return {
    text,
  };
};

export type StatusQuery = {
  status?: boolean;
};

export const mapToStatusQuery = (status: string): StatusQuery => {
  if (status === undefined) {
    return {
      status: undefined,
    };
  }

  const statusMap: Record<string, boolean> = {
    ["false"]: false,
  };

  return {
    status: statusMap[status] ?? true,
  };
};

export type SearchQuery = {
  search?: string;
};

export const mapToSearchQuery = (search: string): SearchQuery => {
  if (search === undefined) {
    return {
      search: undefined,
    };
  }

  return {
    search: String(search).trim(),
  };
};

export type LimitQuery = {
  limit?: number;
};

export const mapToLimitQuery = (limit: string): LimitQuery => {
  const value = Number(limit);

  if (isNaN(value)) {
    return {
      limit: undefined,
    };
  }

  return {
    limit: value,
  };
};
