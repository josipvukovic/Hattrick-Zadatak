﻿// <auto-generated />
using Hattrick.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Hattrick.Migrations
{
    [DbContext(typeof(HattrickDbContext))]
    partial class HattrickDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("Hattrick.Models.Match", b =>
                {
                    b.Property<int>("MatchId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("MatchId"), 1L, 1);

                    b.Property<decimal>("AwayOrDraw")
                        .HasColumnType("decimal(18,2)");

                    b.Property<string>("AwayTeam")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal>("AwayWin")
                        .HasColumnType("decimal(18,2)");

                    b.Property<string>("Competition")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal>("Draw")
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal>("HomeOrAway")
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal>("HomeOrDraw")
                        .HasColumnType("decimal(18,2)");

                    b.Property<string>("HomeTeam")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal>("HomeWin")
                        .HasColumnType("decimal(18,2)");

                    b.Property<string>("MatchDateTime")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("SpecialOffer")
                        .HasColumnType("bit");

                    b.HasKey("MatchId");

                    b.ToTable("Match");
                });
#pragma warning restore 612, 618
        }
    }
}
