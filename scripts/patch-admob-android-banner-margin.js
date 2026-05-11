const fs = require('fs');
const path = require('path');

const target = path.join(
  __dirname,
  '..',
  'node_modules',
  '@capacitor-community',
  'admob',
  'android',
  'src',
  'main',
  'java',
  'com',
  'getcapacitor',
  'community',
  'admob',
  'banner',
  'BannerExecutor.java'
);

if (!fs.existsSync(target)) {
  console.warn('[patch-admob] BannerExecutor.java not found, skipping patch');
  process.exit(0);
}

let source = fs.readFileSync(target, 'utf8');

if (source.includes('Math.max(bottomInset, densityMargin)')) {
  console.log('[patch-admob] Android banner margin patch already applied');
  process.exit(0);
}

const original = `            // set Safe Area only for Android 15+
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.VANILLA_ICE_CREAM) {
                View rootView = activitySupplier.get().getWindow().getDecorView();
                rootView.setOnApplyWindowInsetsListener((v, insets) -> {
                    int bottomInset = insets.getSystemWindowInsetBottom();
                    int topInset = insets.getSystemWindowInsetTop();

                    if ("TOP_CENTER".equals(adOptions.position)) {
                        mAdViewLayoutParams.setMargins(0, topInset, 0, 0);
                    } else {
                        mAdViewLayoutParams.setMargins(0, 0, 0, bottomInset);
                    }

                    mAdViewLayout.setLayoutParams(mAdViewLayoutParams);
                    return insets;
                });
            }

            mAdViewLayout.setLayoutParams(mAdViewLayoutParams);

            int densityMargin = (int) (adOptions.margin * density);`;

const patched = `            int densityMargin = (int) (adOptions.margin * density);

            // set Safe Area only for Android 15+
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.VANILLA_ICE_CREAM) {
                View rootView = activitySupplier.get().getWindow().getDecorView();
                rootView.setOnApplyWindowInsetsListener((v, insets) -> {
                    int bottomInset = insets.getSystemWindowInsetBottom();
                    int topInset = insets.getSystemWindowInsetTop();

                    if ("TOP_CENTER".equals(adOptions.position)) {
                        mAdViewLayoutParams.setMargins(0, Math.max(topInset, densityMargin), 0, 0);
                    } else {
                        mAdViewLayoutParams.setMargins(0, 0, 0, Math.max(bottomInset, densityMargin));
                    }

                    mAdViewLayout.setLayoutParams(mAdViewLayoutParams);
                    return insets;
                });
            }

            mAdViewLayout.setLayoutParams(mAdViewLayoutParams);`;

if (!source.includes(original)) {
  console.warn('[patch-admob] Expected source block not found, patch not applied');
  process.exit(0);
}

source = source.replace(original, patched);
fs.writeFileSync(target, source);
console.log('[patch-admob] Android banner margin patch applied');
