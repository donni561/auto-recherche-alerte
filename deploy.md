
# Deploying AutoSearch to Hostinger

Follow these steps to deploy the AutoSearch application to Hostinger for https://carsearch.live/:

## Step 1: Build the application
Run the following command in your project directory:
```
npm run build
```
This will generate a `dist` folder containing all the static files needed for deployment.

## Step 2: Upload files to Hostinger
1. Log in to your Hostinger control panel
2. Navigate to the File Manager or use FTP
3. Upload all contents of the `dist` folder to the `public_html` directory

## Step 3: Configure for SPA routing
Create a `.htaccess` file in the `public_html` directory with the following content:

```
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

## Step 4: Update DNS settings
Ensure your domain https://carsearch.live/ points to Hostinger nameservers.

## Step 5: SSL Configuration
Enable SSL certificate through Hostinger control panel to ensure https:// works correctly.
