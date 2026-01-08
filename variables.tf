variable "environment" {
  description = "Ambiente de deploy (prod, staging, dev)"
  type        = string
  default     = "staging"
}

variable "db_host" {
  description = "Database host"
  type        = string
  default     = "mysql"
}

variable "db_user" {
  description = "Database user"
  type        = string
  default     = "root"
}

variable "db_password" {
  description = "Database password"
  type        = string
  default     = "root"
}

variable "db_name" {
  description = "Database name"
  type        = string
  default     = "tech_challenge_fiap"
}

variable "jwt_secret" {
  description = "JWT secret used to sign tokens"
  type        = string
  default     = "AUTH_JWT_TECH_CHALLENGE_FIAP"
}

variable "db_port" {
  description = "Database port"
  type        = number
  default     = 3306
}

variable "new_relic_license_key" {
  description = "Chave de licença do New Relic (Ingest License)"
  type        = string
  sensitive   = true
}