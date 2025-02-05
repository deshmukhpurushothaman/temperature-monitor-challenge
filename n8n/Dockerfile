# Use the official n8n Docker image
FROM n8n/n8n:latest

# Set environment variables
ENV N8N_BASIC_AUTH_ACTIVE=true
ENV N8N_BASIC_AUTH_USER=<your-username>
ENV N8N_BASIC_AUTH_PASSWORD=<your-password>
ENV N8N_HOST=localhost
ENV N8N_PORT=5678
ENV N8N_PROTOCOL=http

# Expose port for n8n
EXPOSE 5678

# Default command to run when the container starts
CMD ["n8n"]
