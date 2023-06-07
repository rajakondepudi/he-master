import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';
import { ENUM_APP_ENVIRONMENT } from '../../constants';

export default () => {
  const env = process.env.APP_ENV ?? ENUM_APP_ENVIRONMENT.DEVELOPMENT;
  const YAML_CONFIG_FILENAME = `config-${env}.yaml`;
  return yaml.load(readFileSync(join('configs', YAML_CONFIG_FILENAME), 'utf8')) as Record<string, any>;
};
