const { withDangerousMod } = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

module.exports = function withPodfile(config) {
  return withDangerousMod(config, [
    'ios',
    async (config) => {
      const podfilePath = path.join(config.modRequest.platformProjectRoot, 'Podfile');
      let podfileContent = fs.readFileSync(podfilePath, 'utf-8');

      // Check if our fix is already present
      if (podfileContent.includes('CLANG_ALLOW_NON_MODULAR_INCLUDES_IN_FRAMEWORK_MODULES')) {
        return config;
      }

      // Find where to insert our code (before the last two 'end' statements)
      const insertPosition = podfileContent.lastIndexOf('end\nend');
      
      if (insertPosition !== -1) {
        const fixCode = `
    
    # Fix for Firebase modular headers issue with static frameworks
    installer.pods_project.targets.each do |target|
      target.build_configurations.each do |config|
        config.build_settings['CLANG_ALLOW_NON_MODULAR_INCLUDES_IN_FRAMEWORK_MODULES'] = 'YES'
      end
    end
  `;
        
        podfileContent = podfileContent.slice(0, insertPosition) + fixCode + podfileContent.slice(insertPosition);
        fs.writeFileSync(podfilePath, podfileContent);
      }

      return config;
    },
  ]);
};