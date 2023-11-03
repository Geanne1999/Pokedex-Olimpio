import { Component, Input, SimpleChanges } from '@angular/core';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-pokemon-stats-chart',
  templateUrl: './pokemon-stats-chart.component.html',
  styleUrls: ['./pokemon-stats-chart.component.sass'],
})
export class PokemonStatsChartComponent {
  constructor() {}

  @Input()
  pokemon: { name: string; value: number }[] = [];

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      x: {
        grid: {
          display: true,
        },
      },
      y: {
        grid: {
          display: true,
        },
        ticks: {
          beginAtZero: true,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };
  public barChartLabels: string[] = ['HP', 'Attack', 'Defense', 'Speed'];
  public barChartType: ChartType = 'bar';
  public barChartData: any[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['pokemon']) {
      this.updateChartData();
    }
  }

  updateChartData() {
    const data: number[] = this.pokemon.map(
      (stats: { name: string; value: number }) => stats.value
    );
    this.barChartData = [{ data }];
  }
}

export class ChartModel {
  value: number;
  legend: string;
}

export class StatsPokemon {
  hp: number;
  attack: number;
  defense: number;
  speed: number;
}
