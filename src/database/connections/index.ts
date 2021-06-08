import { ConnectionOptions } from 'typeorm';

import { productionConfig } from './Production';
import { developmentDockerConfig } from './DevelopmentDocker';
import { CLIConfig } from './CLI';
import { testConfig } from './Test';
import { developmentConfig } from './Development';


let exportedConfig: ConnectionOptions;

switch (process.env.NODE_ENV) {
	case 'production':
		exportedConfig = productionConfig;
		break;

	case 'docker_development':
		exportedConfig = developmentDockerConfig;
		break;

	case 'cli':
		exportedConfig = CLIConfig;
		break;

	case 'test':
		exportedConfig = testConfig;
		break;

	default:
		exportedConfig = developmentConfig;
}

export default exportedConfig as ConnectionOptions;
