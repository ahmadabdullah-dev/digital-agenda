using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Mig_9 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateOnly>(
                name: "Date",
                table: "DayTasks",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1));

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "DayTasks",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_DayTasks_UserId",
                table: "DayTasks",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_DayTasks_AspNetUsers_UserId",
                table: "DayTasks",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DayTasks_AspNetUsers_UserId",
                table: "DayTasks");

            migrationBuilder.DropIndex(
                name: "IX_DayTasks_UserId",
                table: "DayTasks");

            migrationBuilder.DropColumn(
                name: "Date",
                table: "DayTasks");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "DayTasks");
        }
    }
}
