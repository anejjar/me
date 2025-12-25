# Dokploy Deployment Guide

This guide will help you deploy your SvelteKit application to Dokploy.

## Prerequisites

1. A Dokploy instance running (self-hosted or cloud)
2. Git repository with your code
3. Node.js 20+ installed locally (for testing)

## Step 1: Install Dependencies

First, install the Node.js adapter:

```bash
npm install
```

This will install `@sveltejs/adapter-node` which is required for Node.js deployment.

## Step 2: Test Build Locally (Optional)

Before deploying, test the build locally:

```bash
npm run build
npm start
```

Visit `http://localhost:3000` to verify everything works.

## Step 3: Deploy to Dokploy

### Option A: Deploy via Git Repository (Recommended)

1. **Push your code to Git**
   - Make sure all changes are committed and pushed to your Git repository (GitHub, GitLab, etc.)

2. **Create a new application in Dokploy**
   - Log in to your Dokploy dashboard
   - Click "New Application" or "Create Application"
   - Select "Docker" as the deployment type

3. **Configure the application**
   - **Name**: Give your application a name (e.g., "anejjar-website")
   - **Git Repository**: Connect your Git repository
   - **Branch**: Select the branch to deploy (usually `main` or `master`)
   - **Build Command**: Leave empty (Dockerfile handles this)
   - **Dockerfile Path**: `Dockerfile` (or leave default)
   - **Port**: `3000` (or configure as needed)
   - **Environment Variables**: Add any required environment variables:
     - `NODE_ENV=production`
     - `PORT=3000` (if different from default)

4. **Deploy**
   - Click "Deploy" or "Save and Deploy"
   - Dokploy will:
     - Clone your repository
     - Build the Docker image using the Dockerfile
     - Start the container
     - Expose the application

### Option B: Deploy via Docker Image

If you prefer to build and push the image manually:

1. **Build the Docker image**
   ```bash
   docker build -t anejjar-website:latest .
   ```

2. **Tag and push to your registry** (if using a registry)
   ```bash
   docker tag anejjar-website:latest your-registry/anejjar-website:latest
   docker push your-registry/anejjar-website:latest
   ```

3. **In Dokploy**
   - Create a new application
   - Select "Docker Image" as the source
   - Provide the image name/tag
   - Configure port and environment variables
   - Deploy

## Step 4: Configure Domain and SSL (Optional)

1. **Add Domain**
   - In your Dokploy application settings, add your domain (e.g., `anejjar.com`)
   - Configure DNS to point to your Dokploy server

2. **Enable SSL**
   - Dokploy can automatically provision SSL certificates via Let's Encrypt
   - Enable SSL/TLS in the application settings

## Step 5: Environment Variables

If your application needs environment variables, add them in Dokploy:

- Go to your application settings
- Navigate to "Environment Variables"
- Add any required variables:
  - `NODE_ENV=production`
  - `PORT=3000`
  - Any other custom variables your app needs

## Troubleshooting

### Build Fails

- Check the build logs in Dokploy
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility (should be 20+)

### Application Won't Start

- Check container logs in Dokploy
- Verify the port is correctly configured (default: 3000)
- Ensure `NODE_ENV=production` is set

### 500 Errors

- Check server logs
- Verify all routes are properly configured
- Ensure static assets are being served correctly

### Port Issues

- Default port is `3000` in the Dockerfile
- Make sure Dokploy is configured to use the same port
- Check if your Dokploy instance requires a specific port range

## Monitoring

Dokploy provides:
- Application logs
- Resource usage (CPU, Memory)
- Deployment history
- Health checks

Monitor these regularly to ensure your application is running smoothly.

## Updating Your Application

1. **Push changes to Git**
2. **Trigger redeployment in Dokploy**
   - Manual: Click "Redeploy" in the Dokploy dashboard
   - Automatic: Configure webhooks for automatic deployment on push

## Notes

- The application uses SSR (Server-Side Rendering) with `@sveltejs/adapter-node`
- Static assets are served from the `/static` directory
- Blog posts are loaded from markdown files at build time
- The Docker image uses a multi-stage build for optimization

## Support

For Dokploy-specific issues, refer to the [Dokploy documentation](https://dokploy.com/docs).

