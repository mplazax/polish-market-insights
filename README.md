# Poland Market Insights

A mobile application that provides accessible, real-time insights into Polish companies, industries, and market sectors using KRS and public data sources.

## Features

- **Company Search and Profiles**: Search companies by name, industry, or location and view detailed profiles with KRS data.
- **Sector and Industry Insights**: View aggregated trends for specific industries with growth rates and financial metrics.
- **Visualizations**: Charts for revenue trends, market share, and profitability comparisons.
- **Watchlists**: Save companies or sectors to track updates and changes.
- **Multi-language Support**: Available in Polish and English.

## Technology Stack

- **Frontend**: React Native with Expo
- **State Management**: Redux with Redux Toolkit
- **Navigation**: React Navigation
- **API Calls**: Axios
- **Visualizations**: React Native Chart Kit

## Getting Started

1. Clone this repository
2. Install dependencies: `npm install`
3. Run the application:
   - iOS: `npm run ios`
   - Android: `npm run android`
   - Web: `npm run web`

## Project Structure

- `/src/components`: Reusable UI components
- `/src/screens`: Application screens
- `/src/store`: Redux store configuration and slices
- `/src/services`: API services and data fetching
- `/src/types`: TypeScript interfaces and types
- `/src/navigation`: Navigation configuration

## Data Sources

Currently uses simulated data, but designed to integrate with:

- KRS (National Court Register)
- GUS (Central Statistical Office)
- Other public Polish market data sources
