import preactCliTypeScript from 'preact-cli-plugin-typescript';
import envVars from 'preact-cli-plugin-env-vars';

export default function (config, env, helpers) {
    preactCliTypeScript(config);
    envVars(config, env, helpers);

}