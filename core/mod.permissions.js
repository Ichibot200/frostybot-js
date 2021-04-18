// API Permissions Handling

const frostybot_module = require('./mod.base')
var context = require('express-http-context');

// Permission defaults

const default_perm = {
  'accounts:add': {
    'standard': [
      'core,singleuser',
      'multiuser,user',
      'token'
    ],
    'provider': [
      'token'
    ]
  },
  'accounts:delete': {
    'standard': [
      'core,singleuser',
      'multiuser,user',
      'token'
    ],
    'provider': [
      'token'
    ]
  },
  'accounts:get': {
    'standard': [
      'core,singleuser',
      'multiuser,user'
    ],
    'provider': []
  },
  'accounts:test': {
    'standard': [
      'core,singleuser',
      'multiuser,user',
      'token'
    ],
    'provider': [
      'token'
    ]
  },
  'cache:flush': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  },
  'cache:stats': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  },
  'config:get': {
    'standard': [
      'core,singleuser',
      'multiuser,user',
      'token'
    ],
    'provider': [
      'token'
    ]
  },
  'config:set': {
    'standard': [
      'core,singleuser',
      'multiuser,user',
      'token'
    ],
    'provider': [
      'token'
    ]
  },
  'gui:chart': {
    'standard': [
      'local',
      'remote'
    ],
    'provider': [
      'local',
      'remote'
    ]
  },
  'gui:content': {
    'standard': [
      'token'
    ],
    'provider': [
      'token'
    ]
  },
  'gui:data': {
    'standard': [
      'token'
    ],
    'provider': [
      'token'
    ]
  },
  'gui:login': {
    'standard': [
      'local',
      'remote'
    ],
    'provider': [
      'local',
      'remote'
    ]
  },
  'gui:main': {
    'standard': [
      'local',
      'remote'
    ],
    'provider': [
      'local',
      'remote'
    ]
  },
  'gui:register': {
    'standard': [
      'local',
      'remote'
    ],
    'provider': [
      'local',
      'remote'
    ]
  },
  'gui:verify_recaptcha': {
    'standard': [
      'local',
      'remote'
    ],
    'provider': [
      'local',
      'remote'
    ]
  },
  'output:status': {
    'standard': [
      'local',
      'remote'
    ],
    'provider': [
      'local',
      'remote'
    ]
  },
  'permissions:add': {
    'standard': [
      'core,local'
    ],
    'provider': [
      'core,local'
    ]
  },
  'permissions:delete': {
    'standard': [
      'core,local'
    ],
    'provider': [
      'core,local'
    ]
  },
  'permissions:get': {
    'standard': [
      'core,local'
    ],
    'provider': [
      'core,local'
    ]
  },
  'permissions:set': {
    'standard': [
      'core,singleuser',
      'multiuser,user',
      'token'
    ],
    'provider': [
      'token'
    ]
  },
  'settings:set': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  },
  'signals:add_admin': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  },
  'signals:add_exchange': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  },
  'signals:add_ip': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  },
  'signals:add_provider': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  },
  'signals:get_providers': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  },
  'signals:remove_admin': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  },
  'signals:remove_exchange': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  },
  'signals:remove_ip': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  },
  'symbolmap:add': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  },
  'symbolmap:delete': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  },
  'symbolmap:get': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  },
  'trade:balances': {
    'standard': [
      'core,singleuser',
      'multiuser,user',
      'token'
    ],
    'provider': [
      'token'
    ]
  },
  'trade:buy': {
    'standard': [
      'core,singleuser',
      'multiuser,user',
      'token'
    ],
    'provider': [
      'token'
    ]
  },
  'trade:cancel': {
    'standard': [
      'core,singleuser',
      'multiuser,user',
      'token'
    ],
    'provider': [
      'token'
    ]
  },
  'trade:cancelall': {
    'standard': [
      'core,singleuser',
      'multiuser,user',
      'token'
    ],
    'provider': [
      'token'
    ]
  },
  'trade:close': {
    'standard': [
      'core,singleuser',
      'multiuser,user',
      'token'
    ],
    'provider': [
      'token'
    ]
  },
  'trade:closeall': {
    'standard': [
      'core,singleuser',
      'multiuser,user',
      'token'
    ],
    'provider': [
      'token'
    ]
  },
  'trade:leverage': {
    'standard': [
      'core,singleuser',
      'multiuser,user',
      'token'
    ],
    'provider': [
      'token'
    ]
  },
  'trade:long': {
    'standard': [
      'core,singleuser',
      'multiuser,user',
      'token'
    ],
    'provider': [
      'token'
    ]
  },
  'trade:market': {
    'standard': [
      'core,singleuser',
      'multiuser,user',
      'token'
    ],
    'provider': [
      'token'
    ]
  },
  'trade:markets': {
    'standard': [
      'core,singleuser',
      'multiuser,user',
      'token'
    ],
    'provider': [
      'token'
    ]
  },
  'trade:order': {
    'standard': [
      'core,singleuser',
      'multiuser,user',
      'token'
    ],
    'provider': [
      'token'
    ]
  },
  'trade:order_history': {
    'standard': [
      'core,singleuser',
      'multiuser,user',
      'token'
    ],
    'provider': [
      'token'
    ]
  },
  'trade:orders': {
    'standard': [
      'core,singleuser',
      'multiuser,user',
      'token'
    ],
    'provider': [
      'token'
    ]
  },
  'trade:pnl': {
    'standard': [
      'core,singleuser',
      'multiuser,user',
      'token'
    ],
    'provider': [
      'token'
    ]
  },
  'trade:position': {
    'standard': [
      'core,singleuser',
      'multiuser,user',
      'token'
    ],
    'provider': [
      'token'
    ]
  },
  'trade:positions': {
    'standard': [
      'core,singleuser',
      'multiuser,user',
      'token'
    ],
    'provider': [
      'token'
    ]
  },
  'trade:sell': {
    'standard': [
      'core,singleuser',
      'multiuser,user',
      'token'
    ],
    'provider': [
      'token'
    ]
  },
  'trade:short': {
    'standard': [
      'core,singleuser',
      'multiuser,user',
      'token'
    ],
    'provider': [
      'token'
    ]
  },
  'trade:stoploss': {
    'standard': [
      'core,singleuser',
      'multiuser,user',
      'token'
    ],
    'provider': [
      'token'
    ]
  },
  'trade:takeprofit': {
    'standard': [
      'core,singleuser',
      'multiuser,user',
      'token'
    ],
    'provider': [
      'token'
    ]
  },
  'trade:tpsl': {
    'standard': [
      'core,singleuser',
      'multiuser,user',
      'token'
    ],
    'provider': [
      'token'
    ]
  },
  'trade:trailstop': {
    'standard': [
      'core,singleuser',
      'multiuser,user',
      'token'
    ],
    'provider': [
      'token'
    ]
  },
  'user:add': {
    'standard': [
      'core,local'
    ],
    'provider': [
      'core,local'
    ]
  },
  'user:change_password': {
    'standard': [
      'token'
    ],
    'provider': [
      'token'
    ]
  },
  'user:delete': {
    'standard': [
      'core,local'
    ],
    'provider': [
      'core,local'
    ]
  },
  'user:disable_2fa': {
    'standard': [
      'token'
    ],
    'provider': [
      'token'
    ]
  },
  'user:enable_2fa': {
    'standard': [
      'token'
    ],
    'provider': [
      'token'
    ]
  },
  'user:log': {
    'standard': [
      'core,singleuser',
      'multiuser,user',
      'token'
    ],
    'provider': [
      'token'
    ]
  },
  'user:login': {
    'standard': [
      'local',
      'remote'
    ],
    'provider': [
      'local',
      'remote'
    ]
  },
  'user:logout': {
    'standard': [
      'token'
    ],
    'provider': [
      'token'
    ]
  },
  'user:multiuser_disable': {
    'standard': [
      'core,local'
    ],
    'provider': []
  },
  'user:multiuser_enable': {
    'standard': [
      'core,local'
    ],
    'provider': []
  },
  'user:register': {
    'standard': [
      'local',
      'remote'
    ],
    'provider': [
      'local',
      'remote'
    ]
  },
  'user:reset': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  },
  'whitelist:add': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  },
  'whitelist:delete': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  },
  'whitelist:disable': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  },
  'whitelist:enable': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  },
  'whitelist:get': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  },
  'whitelist:verify': {
    'standard': [
      'local'
    ],
    'provider': [
      'local'
    ]
  }
}

// Module

module.exports = class frostybot_permissions_module extends frostybot_module {


    // Extract uuid from parameters

    async uuid(params) {
        var multiuser = await this.user.multiuser_isenabled();
        var core_uuid = await this.encryption.core_uuid();
        var params_uuid = params.hasOwnProperty('uuid') ? params.uuid : (multiuser ? undefined : core_uuid);
        var token_uuid = params.hasOwnProperty('token') ? (params.token.hasOwnProperty('uuid') ? params.token.uuid : undefined) : undefined
        if (token_uuid != undefined) {
            return {
                type: 'token',
                uuid: token_uuid
            }
        } else {
            if (params_uuid != undefined) {
                if (params_uuid == core_uuid) {
                    return { 
                        type: 'core',
                        uuid: params_uuid
                    }
                } else {
                    return {
                        type: 'user',
                        uuid: params_uuid
                    }
                }
            }            
        }
        return false;
    }

    // Check permissions for the command for the specified lockdown type

    async check(type, params) {
        params = params.hasOwnProperty('body') ? params.body : params;
        var acl = {};
        var ip = context.get('srcIp');
        var command = params.hasOwnProperty('command') ? params.command : undefined;
        var uuidparams = await this.uuid(params);
        if (uuidparams != false) {
            var uuid = uuidparams.uuid;
            acl['core']  = uuidparams.type == 'core'  ? true : false;
            acl['user']  = uuidparams.type == 'user'  ? true : false;
            acl['token'] = uuidparams.type == 'token' ? true : false;
        //} else {
        //    return this.output.error('required_param', ['uuid']);
        }

        acl['local'] = ['127.0.0.1','::1'].includes(ip) ? true : false;
        acl['remote'] = !acl.local;
        acl['multiuser'] = await this.user.multiuser_isenabled();
        acl['singleuser'] = !acl.multiuser;

        var def = default_perm.hasOwnProperty(command) ? default_perm[command] : {
            standard: [],    
            provider: []     
        }
        var permissions = await this.settings.get('permissions', command, def);
        var perms = [];
        if (permissions.hasOwnProperty(type))
            var perms = permissions[type];
        
        if (Array.isArray(perms)) {
            for (var i = 0; i < perms.length; i++) {
                var check = (perms[i] + ',').split(',').filter((v) => v != '');
                var result = true;
                for (var j = 0; j < check.length; j++) {
                    var entry = check[j];
                    if (!acl.hasOwnProperty(entry) || acl[entry] === false) {
                        result = false;
                        break;
                    }
                }
                if (result === true) {
                    this.output.debug('permission_granted', [type, command, check]);
                    return true;
                }
            }
        }

        this.output.debug('permission_denied', [type, command, perms]);
        this.output.debug('custom_object', ['Required Permissions', perms]);
        this.output.debug('custom_object', ['Current Permissions:', '']);
        this.output.debug(acl);
        return false;
    }

    // Get permissions for the command for the specified lockdown type

    async get(params) {

        var schema = {
            type:  { optional: 'string', format: 'lowercase' },
            cmd:   { options: 'string', format: 'lowercase' },
        }

        if (!(params = this.utils.validator(params, schema))) return false; 

        var [type, command] = this.utils.extract_props(params, ['type', 'cmd']);   
        var def = default_perm.hasOwnProperty(command) ? default_perm[command] : {
            standard: [],    
            provider: []     
        }
        var permissions = await this.settings.get('permissions', command);
        if (permissions == null) return def;
        if (type == undefined) {
            if (this.utils.is_object(permissions)) {
                var sorted = {};
                Object.keys(permissions).sort((a,b) => a > b ? 1 : -1).forEach(key => {
                    sorted[key] = permissions[key];
                })
                permissions = sorted;
            }
            return permissions;
        } else {
            if (permissions.hasOwnProperty(type)) {
                return permissions[type];
            }        
        }
        return def; 
    }

    // Add permissions for the command for the specified lockdown type

    async add(params) {

        var schema = {
            type:  { required: 'string', format: 'lowercase' },
            cmd:   { required: 'string', format: 'lowercase' },
            perms: { required: 'string', format: 'lowercase' }
        }

        if (!(params = this.utils.validator(params, schema))) return false; 

        var [type, command, perms] = this.utils.extract_props(params, ['type', 'cmd', 'perms']);   
        var def = default_perm.hasOwnProperty(command) ? default_perm[command] : {
            standard: [],    
            provider: []     
        }

        var perms = (perms + ',').replace(/ /g,'')
                     .split(',')
                     .sort((a, b) => (a < b ? -1 : 1))
                     .filter((v) => v != '')
                     .join(',')
        var permissions = await this.settings.get('permissions', command, def);
        if (!permissions.hasOwnProperty(type)) {
            permissions[type] = [];
        }
        if (!permissions[type].includes(perms)) {
            permissions[type].push(perms)
            if (await this.settings.set('permissions', command, permissions)) {
                return this.output.success('permissions_add', [type, command, perms]);
            } else {
                return this.output.error('permissions_add', [type, command, perms]);
            }
        } else {
            return this.output.success('permissions_add', [type, command, perms]);
        }
    }

    // Delete permissions for the command for the specified lockdown type

    async delete(params) {

        var schema = {
            type:  { required: 'string', format: 'lowercase' },
            cmd:   { required: 'string', format: 'lowercase' },
            perms: { required: 'string', format: 'lowercase' }
        }

        if (!(params = this.utils.validator(params, schema))) return false; 

        var [type, command, perms] = this.utils.extract_props(params, ['type', 'cmd', 'perms']);   
        var def = default_perm.hasOwnProperty(command) ? default_perm[command] : {
            standard: [],    
            provider: []     
        }


        var perms = (perms + ',').replace(/ /g,'')
                     .split(',')
                     .sort((a, b) => (a < b ? -1 : 1))
                     .filter((v) => v != '')
                     .join(',')
        var permissions = await this.settings.get('permissions', command, def);
        if (!permissions.hasOwnProperty(type)) {
            permissions[type] = [];
        }
        if (permissions[type].includes(perms)) {
            permissions[type] = permissions[type].filter((v) => v != perms);
            if (await this.settings.set('permissions', command, permissions)) {
                return this.output.success('permissions_delete', [type, command, perms]);
            } else {
                return this.output.error('permissions_delete', [type, command, perms]);
            }
        } else {
            return this.output.success('permissions_delete', [type, command, perms]);
        }
    }




}