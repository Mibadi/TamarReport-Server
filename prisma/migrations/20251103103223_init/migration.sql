-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'SUPERVISOR', 'TECHNICIAN', 'OPERATOR');

-- CreateEnum
CREATE TYPE "SimulatorStatus" AS ENUM ('OPERATIONAL', 'UNDER_MAINTENANCE', 'OFFLINE');

-- CreateEnum
CREATE TYPE "ActivityType" AS ENUM ('MAINTENANCE', 'TEST_RUN', 'UPGRADE');

-- CreateEnum
CREATE TYPE "DailyStatusEnum" AS ENUM ('OPERATIONAL', 'WARNING', 'ERROR');

-- CreateEnum
CREATE TYPE "FaultStatus" AS ENUM ('OPEN', 'IN_PROGRESS', 'RESOLVED', 'DISMISSED');

-- CreateEnum
CREATE TYPE "FaultSeverity" AS ENUM ('NORMAL', 'FAILURE', 'SECURITY');

-- CreateEnum
CREATE TYPE "EmployeeRole" AS ENUM ('MAINTENANCE', 'OPERATOR', 'SUPERVISOR');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SimulatorCompany" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "contact_person" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "SimulatorCompany_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SimulatorSite" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "contact_email" TEXT NOT NULL,

    CONSTRAINT "SimulatorSite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Simulator" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "serial_number" TEXT NOT NULL,
    "company_id" INTEGER NOT NULL,
    "site_id" INTEGER NOT NULL,
    "status" "SimulatorStatus" NOT NULL,

    CONSTRAINT "Simulator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activity" (
    "id" SERIAL NOT NULL,
    "simulator_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "type" "ActivityType" NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "duration_minutes" INTEGER,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DailyStatus" (
    "id" SERIAL NOT NULL,
    "simulator_id" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "status" "DailyStatusEnum" NOT NULL,
    "notes" TEXT,
    "recorded_by_user_id" INTEGER NOT NULL,
    "for_which_activator_id" INTEGER NOT NULL,

    CONSTRAINT "DailyStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FaultType" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "severity" "FaultSeverity" NOT NULL,

    CONSTRAINT "FaultType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fault" (
    "id" SERIAL NOT NULL,
    "simulator_id" INTEGER NOT NULL,
    "fault_type_id" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "reported_by_user_id" INTEGER NOT NULL,
    "reported_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolved_at" TIMESTAMP(3),
    "status" "FaultStatus" NOT NULL,

    CONSTRAINT "Fault_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SimulatorEmployee" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "simulator_id" INTEGER NOT NULL,
    "role_on_simulator" "EmployeeRole" NOT NULL,

    CONSTRAINT "SimulatorEmployee_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Simulator_serial_number_key" ON "Simulator"("serial_number");

-- CreateIndex
CREATE UNIQUE INDEX "FaultType_code_key" ON "FaultType"("code");

-- AddForeignKey
ALTER TABLE "Simulator" ADD CONSTRAINT "Simulator_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "SimulatorCompany"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Simulator" ADD CONSTRAINT "Simulator_site_id_fkey" FOREIGN KEY ("site_id") REFERENCES "SimulatorSite"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_simulator_id_fkey" FOREIGN KEY ("simulator_id") REFERENCES "Simulator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyStatus" ADD CONSTRAINT "DailyStatus_simulator_id_fkey" FOREIGN KEY ("simulator_id") REFERENCES "Simulator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyStatus" ADD CONSTRAINT "DailyStatus_recorded_by_user_id_fkey" FOREIGN KEY ("recorded_by_user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyStatus" ADD CONSTRAINT "DailyStatus_for_which_activator_id_fkey" FOREIGN KEY ("for_which_activator_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fault" ADD CONSTRAINT "Fault_simulator_id_fkey" FOREIGN KEY ("simulator_id") REFERENCES "Simulator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fault" ADD CONSTRAINT "Fault_fault_type_id_fkey" FOREIGN KEY ("fault_type_id") REFERENCES "FaultType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fault" ADD CONSTRAINT "Fault_reported_by_user_id_fkey" FOREIGN KEY ("reported_by_user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SimulatorEmployee" ADD CONSTRAINT "SimulatorEmployee_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SimulatorEmployee" ADD CONSTRAINT "SimulatorEmployee_simulator_id_fkey" FOREIGN KEY ("simulator_id") REFERENCES "Simulator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
